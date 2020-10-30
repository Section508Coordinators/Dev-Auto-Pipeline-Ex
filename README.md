# cauldron

> The deque pattern library

This monorepo contains the following packages:

- cauldron-styles ([`packages/styles`](packages/style/README.md))
- cauldron-react ([`packages/react`](packages/react/README.md))

It also contains the documentation / demo app (see `docs/`)

# Note - this is not the official Cauldron repository

The official repository can be found [here](https://github.com/dequelabs/cauldron 'Official repository link')

# Current repository deploy locations

Automated builds via Github Actions and Jenkins are deploying the site to http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/

Accessibility reports (one via the Axe-core backend and one with the HtmlCodesniffer backend) can be found at the following urls

- http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/pa11y-axe/
- http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/pa11y-htmlcs

# development/testing locally

The following instructions are relevant for the current repository and
not the official repository. The goal with these instructions is to
give developers as many options as possible for building the code.

## building the code on windows

### starting with git windows command line tools

- Install GIT Windows tools from https://git-scm.com/downloads
- Download and run the installer
- Accept all of the defaults and continue with installation
- Open the git bash shell and clone the repo https://github.com/jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron
- Install the NodeJS tools for Windows from https://nodejs.org/en/download/
- Select the default options, but at the end choose to have it
  automatically handle compiling native dependencies by installing chocolatey
- Run an elevated Windows powershell (run as administrator)
- Accept the defaults
- Start a new git-bash shell (close the old one if it's still open) and navigate to the top level of the project
- Run 'npm install --global yarn'
- Run 'npm install --global lerna'
- Run 'npm install --global typescript'
- Run 'npx lerna bootstrap'
- In the new git-bash shell, cd to the cauldron checkout and run 'NODE_ENV=production yarn --cwd=packages/react build'
- Another good command to run is 'yarn --cwd=packages/react test'
- 'NODE_ENV=production yarn --cwd=packages/styles build'
- 'npm install'
- 'yarn dev'
- navigate to localhost:8000 and you should see the cauldron site
- in a different git bash window, navigate to the top level of the source directory
- see if pa11y is able to validate the site by running './node_modules/.bin/pa11y-ci -c ./.pa11yci-htmlcs'
- see if pa11y is able to validate the site via axe by running './node_modules/.bin/pa11y-ci -c ./.pa11yci-axe'
- run the pa11y axe tests via yarn 'yarn test-pa11y-axe'
- run the pa11y tests via yarn 'yarn test-pa11y-htmlcs'
- generate the html axe report via 'yarn generate-pa11y-axe-report'
- generate the html htmlcs report via 'yarn generate-pa11y-htmlcs-report
- navigate in explorer to docs/dist and you'll see the subdirectories with the respective reports

### VSCode + Docker Desktop

- follow the directions here to enable WSL2 on your machine - https://docs.microsoft.com/en-us/windows/wsl/install-win10
- after completing the WSL2 directions (and optionally the terminal
  directions), install Docker Desktop https://www.docker.com/products/docker-desktop
- after Docker Desktop is installed, log back in again
  - for some reason at this point I had an error related to hyper-v not being enabled
  - I went to enable/disable windows features and enabled Hyper-v and management tools and rebooted
- install VSCode https://code.visualstudio.com/
- In VSCode, install recommended extensions
  - Docker
  - Remote - Containers
  - Remote - WSL
  - any other recommended extensions
- Ensure everything is working as expected by checking out the default Dequeue cauldron project (not our private somewhat customized repo) - https://github.com/dequelabs/cauldron . You can check out directly from VSCode or git-bash
- open the new repo directory in VSCode
- click on the 'containers' icon on the left
- click the "+" symbol to add a new container
- select "node.js and typescript" as the container type
- select the default node version
- this should start up a container and you should see a terminal in the bottom pane with "workspace" in the path
- 'ls' should list your project home directory files
- follow the previously mentioned build steps to build and run the code

## building the code on Linux (coming soon maybe...)
