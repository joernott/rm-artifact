# rm-artifact
Delete github action artifacts. Either a name or a glob pattern can be provided.

## Example
```yaml
      - name: 'Delete artifact'
        uses: joernott/rm-artifacts@v1
        with:
          name: hello
          useGlob: false
```

## Parameters

*name:* Name of the artifact to delete. When useGlob is set to `true`, this can be a pattern.

*useGlob:* If this is set to true, all artifact matching the pattern provided in "name" will be deleted.

*failOnError:* Should the action fail if it encounters an error

