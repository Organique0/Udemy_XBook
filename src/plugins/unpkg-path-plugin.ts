import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                }
                //if you have import statements then we need to reach to unpkg to get that file also
                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        //this generates new url that is a combination of the importer ("https://unpkg.com/medium-test-pkg") and path to file (./helpers/utils)
                        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                    }
                }
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
              const message = require('react');
              console.log(message);
            `,
                    };
                }
                //unpkg auto redirect to correct folder. We can get the redirected url to figure out the correct folder to look into
                const { data, request } = await axios.get(args.path);
                return {
                    loader: 'jsx',
                    contents: data,
                    //saves the correct url to be used later
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
            });
        },
    };
};