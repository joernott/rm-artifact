const core = require("@actions/core");
const { minimatch } = require('minimatch');
const { DefaultArtifactClient } = require("@actions/artifact");

async function run() {
  const id = [];
  try {
    const name = core.getInput("name", { required: true });
    const useGlob = core.getBooleanInput("useGlob", { required: false });
    const failOnError = core.getBooleanInput("failOnError", { required: false });
    const artifactClient = new DefaultArtifactClient();
    // get a single artifact
    core.info(`Starting check for ${name}`);
    if (!useGlob) {
      try {
        const {id} = await artifactClient.deleteArtifact(name);
      } catch (err) {
        core.error(`Could not delete artifact ${name}.`);
        core.error(err);
        if (failOnError) {
          core.setFailed(err.message);
        }
      }
    } else {
      try {
        const {artifacts} = await artifactClient.listArtifacts();
        artifacts.forEach(function(artifact) {
          if (minimatch(artifact.name, name)) {
            try {
              const {id} = artifactClient.deleteArtifact(artifact.name);
            } catch (err) {
              core.error(`Could not delete artifact ${artifact.name}.`);
              core.error(err);
              if (failOnError) {
                core.setFailed(err.message);
              }
            }
          }
        });
      } catch (err) {
        core.error(`Could not find artifacts matching ${name}.`);
        core.error(err);
        if (failOnError) {
          core.setFailed(err.message);
        }
      }
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
