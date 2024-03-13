# rm-artifact
Deletes github action artifacts. Either a name or a glob file pattern can be provided.
After updating to the v4 github actions, I started using [GeekyEggo/delete-artifact@v4](https://github.com/GeekyEggo/delete-artifact) but ran into some weird issues. Sometimes only a few of the artifacts were deleted, sometimes none. There were a few similar actions, but none allowed glob pattern or regexes. Inspired by [LIT-Protocol/artifact-exists-action@v0](https://github.com/LIT-Protocol/artifact-exists-action), a simple and straightforward implementation, I decided to write my own action in a similar way.

## Example
Have a look at our [tests](.github/workflows/test.yml) on how to use this action in a workflow.
```yaml
      - name: 'Delete artifact'
        uses: joernott/rm-artifacts@v1
        with:
          name: hello
          useGlob: false
          failOnError: true
```

## Parameters
_token:_ *required, default: ${{ github.token }}*  
Github token or PAT used to access the GitHub API

_name:_ *required*  
Name of the artifact to delete. When useGlob is set to `true`, this can be a pattern.

_useGlob:_ *optional, default: false*  
If this is set to true, all artifact matching the pattern provided in "name" will be deleted.

_failOnError:_ *optional, default: true*  
Should the action fail if it encounters an error

## Contributing
Feel free to participate and open pull requests or issues.
