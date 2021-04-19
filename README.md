# Test Automation CI/CD Pipeline Examples

## Accessibility-aware automated CI/CD workflows

> UPDATED:  04/19/2021

---
# Description of examples

This monorepo contains fully-functional examples of strategies for integrating automated accessibility testing into multiple industry-standard automated, CI/CD pipeline tools within multiple technical environments.  Accessibility testing is done against  ReactJS graphical user interface (GUI) code and multiple accessibility testing engines and rulesets. 

Below is a breakdown the the core technologies covered:

- **Test Automation Server Technologies**
  - [Jenkins, CI](https://www.jenkins.io/)
  - [Atlassian Bamboo](https://www.atlassian.com/software/bamboo)
  - [AWS CodePipeline](https://aws.amazon.com/codepipeline/)
  - [Microsoft Azure Pipelines](https://azure.microsoft.com/en-us/)
  - [GitHub Actions](https://docs.github.com/en/actions)
- **Automated accessibility testing libraries and engines**
  - Axe-core open source accessibility library (rules)
  - HTML Code Sniffer open source accessibility library (rules)
  - Pa11y-ci accessibility (testing engine)
- **Programming and testing frameworks**
  - ReactJs programming framework
  - Jest testing framework
  - Jest-axe custom matcher
- **Technical environments**
  - MS Windows 10
  - Ubuntu
  - Cloud Providers
    - Amazon Web Services
    - Microsoft Azure

The GUI code used in this repository is from the Deque Cauldron repository located [here](https://github.com/dequelabs/cauldron). As such, this repository contains the following packages used to build the **ReactJS** code library and web site examples to be tested for accessibility:

- cauldron-styles ([`packages/styles`](packages/style/README.md))
- cauldron-react ([`packages/react`](packages/react/README.md))

Once the example GUI code is built, all examples illustrate the performance of automated accessibility testing by performing both unit and integration testing against the code library and demo web site examples using axe-core and HTML code Sniffer (HTMLCS) accessibility testing rulesets via the pa11y-ci  test engine. This testing is configured to test all GUI elements against Section 508 rules that are considered "friendly" to those success criteria in Trusted Tester for Web v5 and ICT Baseline Testing for web version 3 for version 3.5 of axe-core and version 2.5 of HTMLCS.

# How to use these examples

The examples are meant to be a “quick start” to integrating automated accessibility testing can be achieved by reproducing the examples, as described in this documentation, and then extrapolating those concepts to the individual technology stacks used at the home organizations. However, it is acknowledged that not every organization can accommodate the immediate installation of all of the technology in the examples – especially the three advanced examples in the Dev-Automation repository. There for these examples can be used in 2 different ways – depending on your local organization’s capabilities:

1. <u>Test environment</u>: You can set up a test environment at your location, with the proper permissions to install all dependencies used in the examples, fork (or otherwise copy) the example to that environment and immediately “experience” the automated accessibility test integration at work in a fully-functioning manner.

2. <u>Source code analysis</u>: If a test environment is not immediately available to you and your organization will not allow all dependencies to be installed to run the examples as is, you can still fork (or otherwise copy) the source code to your local location and review specifically how the code examples implement automated accessibility test integration, and software capabilities can be implemented locally, as your organization approves the needed software components, to emulate the accessibility features at your organization at your full control.

## Documentation for implementing examples

Download the instructions below for implementing the automation example representing the technology in which you have interest:

- Jenkins, CI
- AWS CodePipeline
- Microsoft Azure Pipelines
- GitHub Actions

# Package versions

Periodically package audits associates with this repository should be performed to check for outdated or vulnerable dependencies. This can be done in several ways. `yarn audit` can be run in the home directory and each of the 'packages'
subdirectories'. This will give a report showing dependencies that require attention.

Updating dependencies in the case of vulnerabilities can be a challenging task. This is beyond the current scope of this document
but here is a brief example of how yarn-audit-fix can be used to update package dependencies with issues.

In the home directory and each package directory of the project run
`npx yarn-audit-fix --force`  

This may take a while to complete. After updating dependencies you
will need to verify that no bugs have been introduced by the changes.

---

04/19/2021 | 04:19p