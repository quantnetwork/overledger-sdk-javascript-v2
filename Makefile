default:
	yarn run bootstrap
	cd packages/overledger-core && yarn run build && cd ../..
	cd packages/overledger-bundle && yarn run build && cd ../..
