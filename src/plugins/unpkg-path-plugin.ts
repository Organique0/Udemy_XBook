import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            //filter for index.js
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            })

            //if you have import statements then we need to reach to unpkg to get that file also
            //filter for imports
            build.onResolve({ filter: /^\.+\// }, async (args: any) => {
                return {
                    namespace: 'a',
                    //this generates new url that is a combination of the importer ("https://unpkg.com/medium-test-pkg") and path to file (./helpers/utils)
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })

            //handle main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });
        },
    };
};