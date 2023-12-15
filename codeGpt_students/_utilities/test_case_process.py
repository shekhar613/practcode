import subprocess
import tempfile
import os


class C_testcase():
    
    def test(testcases,expected_ans,code):
        testStatus = {}
        

        # Test cases in the format ["2\n2", "5\n5", "10\n10"]
        
        # Expected outputs in the format {"2\n2": "4", "5\n5": "10", "10\n10": "20"}
        expected_output = expected_ans
        # {"2\n2": "5", "5\n5": "10", "10\n10": "20"}

        try:
            # Create a temporary C file
            with tempfile.NamedTemporaryFile(mode='w+', suffix='.c', delete=False) as c_file:
                c_file.write(code)
                c_file_path = c_file.name

            # Compile the C program
            compiled_program_path = c_file_path.replace('.c', '.exe')
            compile_command = ['gcc', c_file_path, '-o', compiled_program_path]
            subprocess.run(compile_command, check=True)
        except Exception as CodeError:
           
            testStatus['error'] = 'compilation error'
        # Run the compiled program with each test case and compare the output
        
        for test_case in testcases:
            try:
                # Run the compiled program with the input
                run_command = [compiled_program_path]
                process = subprocess.Popen(run_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                output, errors = process.communicate(input=test_case)

                # Get the expected output from the dictionary
                expected_output_value = expected_output.get(test_case)

                # Print the output or errors, and compare with the expected output
                if process.returncode == 0:
                    
                    if expected_output_value==output.strip():
                        testStatus[test_case]=True
                    else:
                        testStatus[test_case]=False
       
                    assert output.strip() == expected_output_value, "Test case failed"
                else:
                    testStatus[test_case]=False
                    
            except Exception as Er:
                testStatus['error']=str(Er)
        # Clean up: remove temporary C file and compiled program
        import os
        os.remove(c_file_path)
        os.remove(compiled_program_path)

        return testStatus


        