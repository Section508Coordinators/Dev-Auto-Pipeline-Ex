# Code Commit

## Create a new repository using AWS CodeCommit

- Log into the AWS Console and navigate to CodeCommit.
- Select create repository
- Visit the details page for the repository (it's currently empty) and
  view the connection instructions
- Use the connection instructions that best fit your platform and
  workflow. For me, it was the Linux SSH instructions
	- Ensure you're using an IAM user
	- Navigate to IAM
  - Select your user
  - Select security credentials
  - select 'Upload SSH public key'
  - upload your chosen public key file
  - Note the key ID
  - Edit ~/.ssh/config
  - Go ahead and try to clone the empty repository just to get the url
    added to your 'known_hosts' file
  - Delete the cloned empty repository
- *Do not* clone the empty repository. Our goal is to push our current
  local code repository to CodeCommit.
- Navigate to your local repository with your projects
- Use git to add a new remote pointing to your newly created CodeCommit repo
- Git push to your new remote


Temp-OAST-CI-CD-Examples-Task1-Cauldron repository to AWS.

I followed the examples to connect via ssh for linux (after creating
the repository you can drill into connection instructions per platform).

