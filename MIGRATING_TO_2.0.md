# Migrating to V2

- If you're using an older version of React, you'll have to upgrade to React 17.
- You'll have to upgrade to Emotion 11. The main thing to notice is that you'll need to uninstall @emotion/core and install @emotion/react instead. More details [here](https://emotion.sh/docs/emotion-11)
- If you’d like to disable the default validation of form fields, you now have to pass in a function that returns null `validate={() => null}` instead of `validate={false}`
