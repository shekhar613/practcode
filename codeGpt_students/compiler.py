
from multiprocessing import process
import os
import hashlib
import random
import re
import subprocess
import json




# Define the allowed programming languages
ALLOWED_LANGUAGES = set(['java', 'py', 'c', 'cpp'])

# Define the temporary directory to store the compiled files
# Get the directory of the current script

TEMP_DIR = 'temp'

def run_code(data):
    try:
        # Get the code and language from the request
        # data = request.get_json()
        code = data['code']
        language = data['language']
        
        if language == 'python':
            language = 'py'

        # Check if the language is allowed
        if language not in ALLOWED_LANGUAGES:
            return  {'error': f'Unsupported language: {language}',"status":400}

        # Generate a unique filename based on a random hash
        random_hash = hashlib.md5(str(random.randint(0, 1000000)).encode()).hexdigest()[:7]
        file_path = os.path.join(TEMP_DIR, f'{random_hash}.{language}')

        # Write the code to a file
        with open(file_path, 'w') as f:
            f.write(code)

        # Compile or execute the code depending on the language
        if language == 'java':
            # Find the class name from the code
            # Regular expression to match the class name
            class_name_regex = r'class\s+(\w+)\s*\{'

            # Search for the class name in the Java code
            class_name_match = re.search(class_name_regex, code)
            # class_name_match = re.search(r'public\s+class\s+(\w+)', code)
            if class_name_match is None:
                return  {'error': 'Could not find class name',"status":400}
            class_name = class_name_match.group(1)
            # Compile the code
            result = subprocess.run(['javac', file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode != 0:
                return  {'error': result.stderr.decode(),"status": 400}


            # Run the code
            command = ['java', '-classpath', TEMP_DIR, class_name]
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            output = result.stdout.decode() + result.stderr.decode()
            os.remove(file_path)
            return  {'output': output,"status":200}
            

        elif language in ('py', 'c', 'cpp'):
            executable_path = os.path.join(TEMP_DIR, random_hash)
            
            if language == 'py':
                # command = ['python', file_path]
                result = subprocess.run(['python', '-c', code], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            elif language == 'c':
                command = ['gcc', file_path, '-o', executable_path]
                result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                os.remove(file_path)
            else:  # language == 'cpp'
                command = ['g++', file_path, '-o', executable_path]
                result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                

            
            if result.returncode != 0:
                return  {'error': result.stderr.decode(),"status":400}
            else:
                if language == 'c' or language == 'cpp':
                    result = subprocess.run([executable_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                
                output = result.stdout.decode() + result.stderr.decode()
                return  {'output': output,"status":200}        

    except Exception as e:
        return  {'error': str(e),"status":500}
