import json,os
import subprocess
import hashlib
import random
import re

# Define the temporary directory to store the compiled files
script_directory = os.path.dirname(__file__)

# Define the relative path to your TEMP_DIR in the same directory as your script
TEMP_DIR = os.path.join(script_directory, 'temp')
# TEMP_DIR = 'temp'

def clean_up():
    folder_path = TEMP_DIR

    # List all files in the folder
    files = os.listdir(folder_path)

    # Iterate through the files and remove each one
    for file in files:
        file_path = os.path.join(folder_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)

# read the JSON file

def play(question):
    try:
        # if question['language'] in ['py','python','Python']:
        #     print(question)
        #     testStatus = {question["id"]:{}}
        #     # iterate over the test cases and expected outputs
        #     for i, (test_case, expected_output) in enumerate(zip(question['test_cases'], question['expected_outputs'])):
        #         print(i,test_case,expected_output)
        #         # run the test case
        #         proc = subprocess.Popen(['python', '-c', question['question']], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        #         # test_data = f"{1}\n{3}\n"
        #         output, error = proc.communicate(input=test_case.encode())
        #         output_str = output.decode().strip()
        #         print(f'output = = {output.decode()}')
        #         if len(error)==0:
        #             testStatus[question["id"]].update({i:{"status":True,"output":output_str,"expected":expected_output,"TestCaseInputs":test_case.split('\n')}})
        #         # check the output against the expected output
        #         try:
        #             assert output_str == expected_output, f"Question {question['id']}, test case {i+1}: Output '{output_str}' does not match expected output '{expected_output}'"
                
        #         except Exception as e:
        #             # print(e)
        #             testStatus[question["id"]].update({i:{"status":False,"output":output_str,"expected":expected_output,"TestCaseInputs":test_case.split('\n'),"msg":f"{output_str} not match with Expected output {expected_output} !"}})
        if question['language'] in ['C','c']:
            # c language code\
            # Generate a unique filename based on a random hash
            r = {}
            random_hash = hashlib.md5(str(random.randint(0, 1000000)).encode()).hexdigest()[:7]
            file_path = os.path.join(TEMP_DIR, f'{random_hash}.{question["language"]}')

            # Write the code to a file
            with open(file_path, 'w') as f:
                f.write(question['question'])

            executable_path = os.path.join(TEMP_DIR, random_hash)
            command = ['gcc', file_path, '-o', executable_path]
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            

            # iterate over the test cases and expected outputs
            for i, (test_case, expected_output) in enumerate(zip(question['test_cases'], question['expected_outputs'])):
                print(i,test_case,expected_output)

                result = subprocess.run([executable_path],input=test_case.encode() ,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                r[i]=result.stdout.decode() + result.stderr.decode()

            print(result.stdout.decode() + result.stderr.decode())
            print("r == ",r)

            testStatus = {'data':result.stdout.decode() + result.stderr.decode(),"r":r}
            clean_up()
    except Exception as testcaseError:
        print(testcaseError)
    return testStatus
