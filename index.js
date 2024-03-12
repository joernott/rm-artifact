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
        core.info(`Deleted artifact ${name} (${id})`)
      } catch (err) {
        core.error(`Could not delete artifact ${name}.`);
        core.error(err);
        if (failOnError) {
          core.setFailed(err.message);
        }
      }
    } else {
      try {
        const artifactResponse = await artifact.listArtifacts();
        artifactResponse.artifacts.forEach(function(artifact) {
          if (minimatch(artifact.name, name)) {
            try {
              const {id} = artifactClient.deleteArtifact(artifact.name);
              core.info(`Deleted artifact ${artifact.name} (${id})`)
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
