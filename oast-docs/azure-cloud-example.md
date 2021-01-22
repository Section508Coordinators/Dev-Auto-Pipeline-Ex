# Deployment of Static Website in React to Azure Storage using Azure DevOps

This document contains instructions for configuring Azure DevOps to build, test,
and deploy a static React website using only Azure-provided tooling.

# Create new Resource Group

A resource group is a container that holds related resources for an Azure
solution. The resource group can include all the resources for the solution, or
only those resources that you want to manage as a group. You decide how you want
to allocate resources to resource groups based on what makes the most sense for
your organization. Generallyf, add resources that share the same lifecycle to
the same resource group so you can easily deploy, update, and delete them as a
group.

1. Login in to portal.azure.com
2. From the sidebar, click “Resource Groups”
3. Click “New”
4. Select Subscription and enter a Resource Group name and then click “Review + Create”

# Create new Storage Account

The next step is to create the storage account where the files will be stored
and used for our static website.

1.  From the sidebar, click “Storage accounts”
2.  Click “Add”
3.  Select the Subscription/Resource Group you created above. Give your storage
    account a name and select the region you want the assets to be stored in.
4.  Proceed to select any advanced options / tags if required, otherwise click
    “Review + Create”
5.  Select your new storage account and click “Static website” under “Settings”.
6.  Enable static website hosting and provide a name for the index document
    (index.html)
    - Enabling static website will create an Azure Storage container to host the
      static website called \$web
    - The \$web container can be found under “Blob Service” → “Containers”
7.  While in the Storage Account, navigate to “Settings” → “Access Keys” and
    take a note of “Key #1” as we’ll need this later.

# Create the Code Repository and Build Pipeline

Navigate to https://devops.azure.com and if required click “Create Project”.
Give it a name, set your preferred visibility option and then click “Create”.

Now that we have a DevOps project we can create a repository. Select "Create
Repository" but do not initialize the repository with any code. We'll push the
code from our existing repository soon.

In order to push and pull code to/from the repository, we'll use ssh keys. In
order to allow for your ssh key to be accepted - find your public ssh key
~/.ssh/xxxx.pub and then configure that public key in the Azure portal.

Directions can be found here
<https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops>.

After adding your public ssh key you should use Git to push the develop branch
from your local environment to the new empty Azure DevOps repository.

With our DevOps project created, it’s time to start building the Build pipeline
which will produce a .zip artifact that will be used by the Release pipeline
that will be created in the next section.

1. Click “Pipelines” → “New Pipeline”
2. Select your previously created repository
3. On the Configure your pipeline page - select the 'develop branch' and select /azure-pipeline-develop.yml
4. Click the down arrow on the "Run" button and select "Save"
5. Rename the pipeline and prefix "Develop" to the name to differentiate from
   the stable pipeline we're about to add.

Repeat the previous process for the other branch "Stable" replacing any
references to "Develop" with "Stable"

### view the pipeline For the “develop” branch:

Ensure you're changed to the develop branch and view the code at <../azure-pipelines.yml>

### view the pipeline For the “stable” branch:

Ensure you're changed to the develop branch and view the code at <../azure-pipelines.yml>

This will produce a build (npm install, yarn build, etc.) and will produce the
artifacts. _Source Folder_ reads from your build directory
`($(Build.SourcesDirectory)/docs/dist)` and set the _Target Folder_ to
`$(Build.ArtifactStagingDirectory)`. This task also is configured so the target
is your build directory and is output to
`$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip`. The last step of the
pipline publishes the build artifact.

# Create the Release Pipeline

With the build pipeline complete and a zip archive of our build directory being
produced, we need to release it to the Azure Storage we previously created. To
accomplish the upload, we’ll use the Azure CLI in the release pipeline as that’s
what I’ve had the best results with. This step has to be done twice, one for
Develop Release and a second time for Stable Release.

1. From the left sidebar, select “Pipelines” → “Releases”
2. Click “Create release”
3. Select “Start with an empty job”
4. Rename the stage to “Develop Release” and click Save
5. Click “Add an artifact” and select your project and then build pipeline you
   just created and make sure that the default version is set to “Latest”
6. Click on the lightning bolt above where you selected your artifact and enable
   continuous deployments so that whenever a build pipeline completes, it will
   start your release pipeline automatically. Also make sure to include the
   Build branch filters to Type → Include and Build branch → develop. In order
   to release only when the push comes from develop branch. Also make sure under
   “Stages” the trigger is set to “After release”.
   <./azure-1.png>
7. For “Stable Release” the Pre-deployment conditions must be set to Manual Only
   <./azure-2.png>
8. Under your stage name, click “1 job, 0 task”
9. Click on “Agent job” and change the agent pool to your preferred choice
   (Windows/Linux) and click Save.
10. Next to the agent job task, click “+” to add a new task to the release
    pipeline and select the “Extract Files” task.
11. Configure the task so the “Archive file patterns” match what we’ve produced
    in the build pipeline \*_/_.zip and set the destination folder to
    `$(System.DefaultWorkingDirectory./$(Build.BuildId)`.
12. Add a new task to the release pipeline and select “Azure CLI” from the list.
    Select the Script Type → Shell and Script Location → Inline Script and input the
    following script: `az storage blob upload-batch --account-name $name --account-key $key --destination '$web' --source ./dist`
13. Click “Environment Variables” → create a variable name with the name of your
    storage account, and create variable key with the “Key #1” that was copied
    when the new storage account was created.
    <./azure-3.png>
14. Set the working directory to
    `$(System.DefaultWorkingDirectory)/$(Build.BuildId)`.
15. Save the pipeline and create a new release to manually trigger the pipeline.
    Once complete, you can visit the URL of your static site and see your
    deployment. The static website URL was given to you when you enabled the
    static website feature in your storage account, to obtain this URL again
    just navigate back to portal.azure.com, select your storage account → static
    website.

Any object inside of this blob will be publicly accessible via the static website URL.
