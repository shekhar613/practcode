import json
import subprocess

# read the JSON file

def play(question):
    testStatus = {question["id"]:{}}
# iterate over the test cases and expected outputs
    for i, (test_case, expected_output) in enumerate(zip(question['test_cases'], question['expected_outputs'])):
    # run the test case
        proc = subprocess.Popen(['python', '-c', question['question']], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = proc.communicate(input=test_case.encode())
        output_str = output.decode().strip()
        # print(output)
        if len(error)==0:
            testStatus[question["id"]].update({i:{"status":True,"output":output_str,"expected":expected_output,"TestCaseInputs":test_case.split('\n')}})
    # check the output against the expected output
        try:
            assert output_str == expected_output, f"Question {question['id']}, test case {i+1}: Output '{output_str}' does not match expected output '{expected_output}'"
          
        except Exception as e:
            # print(e)
            testStatus[question["id"]].update({i:{"status":False,"output":output_str,"expected":expected_output,"TestCaseInputs":test_case.split('\n'),"msg":f"{output_str} not match with Expected output {expected_output} !"}})

    
    return testStatus


