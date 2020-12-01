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
	https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes
- Git push to your new remote

## AWS CodeBuild

- Select 'create build project'
- Name the project (matching the repo name makes sense)
- For the Source 1 - Primary select 'AWS CodeCommit' and the
  repository you created and populated in the previous set of steps
- Reference type should default to 'Branch'
- Choose the default branch
- Keep the clone depth at 1
- Use a 'Managed image' and select 'Ubuntu'
- Use the 'Standard' runtime
- Use the latest codebuild standard image
- Environment should be Linux
- Select 'New service role' unless you already have a service role
  that was previously set up
- Default to the normal buildspec yaml config
- Enter the Cloudwatch group 'Temp-OAST-CI-CD-Examples-Task1-Cauldron'
  and stream 'develop-branch-build' name
- Select 'Create Build Project'
- View the output log to ensure there are no errors
- You can also navigate to Cloudwatch, find the log group and stream,
  and view historical build logs there

## Generate a buildspec.yml file to implement the build pipeline

See the example in [buildspec.yml](buildspec.yml)

- Commit buildspec.yml and push to the AWS hosted Git develop branch
- Navigate to CodeBuild->Build Projects, select the previously created
  project and click 'start build'
- Accept the defaults and click the 'Start Build' button at the bottom



