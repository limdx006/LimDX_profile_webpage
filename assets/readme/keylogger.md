# CP3416-Keylogger-Project
Python program that records user's keyboard for future use in ML

# Project Overview
This project is a behavioural cybersecurity tool that collects typing data (keystroke dynamics) to differentiate between an authorised user and intruders.
It records key-down and key-up timestamps, extracts behavioural features (e.g., hold time and flight time), and saves the data for machine learning analysis.
The ultimate goal is to train a model to classify whether the typing pattern belongs to the authorised user or an intruder.

# Features
Records key press and key release timestamps.
Extracts behavioural features such as:
- Hold time (time a key is pressed)
- Flight time (time between consecutive keys)
- Organises data using digraphs (two-key sequences) for ML analysis.
- Allows participants to choose a save location for the dataset.
- Converts Python code into a standalone executable for non-Python users.

# Project Workflow
Data Collection
- Record timestamps for key-down and key-up events.
- Extract hold time and flight time for each keystroke sequence.
- Organise into digraphs.

Feature Extraction
- Prepare dataset for ML training/testing.

Machine Learning
- Train models like KNN, Random Forest, or SVM.
- Use train and test data sets. (may use validation data set to prevent overfitting)
- Evaluate classification accuracy for authentication.

# Program sequence
1. Start the program
2. Consent message
3. Show sentence to type
4. Record keystrokes
5. User presses save (after the requirement is met)
6. Choose the save location
7. CSV saved (for future usage)
8. Thanks message (optional)

# Ethical Notice
This project is for academic research purposes only. 

All participants must give informed consent before their typing data is recorded. 

The program does not monitor typing or other information secretly and only records data for the project. 

# References
- Keyboard library: https://github.com/boppreh/keyboard#api
- eStyler example project: https://github.com/rdillon73/eStyler
- Paper: Revisiting clustering methods for their application on keystroke dynamics for intruder classification

## Sound effect references
- Myinstants. (n.d.). Correct answer - Sound Button. Myinstants. https://www.myinstants.com/en/instant/correct-answer/
- Myinstants. (n.d.). Windows 7 error sound - Sound Button. Myinstants. https://www.myinstants.com/en/instant/windows-7-error-sound-73457/
- Myinstants. (n.d.). Duolingo completed lesson - Sound Button. Myinstants. https://www.myinstants.com/en/instant/duolingo-completed-lesson-48481/ 
- Myinstants. (n.d.). Typewriter - Sound button. Myinstants. https://www.myinstants.com/en/instant/typewriter-15339/

# Kaggle link
- Keylog file: https://www.kaggle.com/datasets/limdx006/authenticated-user-keylog
- Baseline: https://www.kaggle.com/code/limdx006/keylogger-project-baseline
- Random Forest: https://www.kaggle.com/code/limdx006/keylogger-project-random-forest

# Authors
Lim Dong Xian


