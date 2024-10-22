# Crown Marketplace maintenance

Marketplace application that provides a static maintenance/service unavailable page.

This is a minimal deno based application that can be used to serve a static HTML page indicating that a service is unavailable.

The page served is stored in the `public/index.html` file.

Within the Crown Marketplace platform it is built and deployed as a Docker container as described in the `Dockerfile`.

## To run locally
During development or testing the application can be executed locally using the following commands:

```
deno task dev
```

The application can now be accessed as `localhost:8080`.
