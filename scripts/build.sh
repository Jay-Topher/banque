yarn tsc

cd client
export SKIP_PREFLIGHT_CHECK=true
yarn --frozen-lockfile --production=false
yarn build
