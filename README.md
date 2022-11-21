# Create a JavaScript Action

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

If you are familiar with terraform, you can use this to setup S3 bucket and Cloudfront (optional) https://github.com/cloudmaniac/terraform-aws-static-website

## Input

| Name     | Required | Default |
|----------|----------|---------|
| buildDir | false    | `build` |

## Usage

```yaml
- uses: enjoy2000/s3-static-site-deploy@v2
  input:
    buildDir: build  # default
  env:
    AWS_DEFAULT_REGION: us-west-1,
    AWS_ACCESS_KEY_ID: <input>,
    AWS_SECRET_ACCESS_KEY: <input>,
    AWS_BUCKET: <input>,  # the bucket you want to deploy to
```

## Example with react-scripts build

```yaml
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: enjoy2000/s3-static-site-deploy@v2
        name: Deploy to s3
        input:
          buildDir: 'build'  # default
        env:
          AWS_DEFAULT_REGION: us-west-1,
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }},
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }},
          AWS_BUCKET: <input>,  # the bucket you want to deploy to
```
