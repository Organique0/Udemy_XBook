import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache',
});

export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: input,
                    };
                }
                //check if we have the file in cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                }

                //unpkg auto redirect to correct folder. We can get the redirected url to figure out the correct folder to look into
                const { data, request } = await axios.get(args.path);

                const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

                const result: esbuild.OnLoadResult = {
                    loader: loader,
                    contents: data,
                    //saves the correct url to be used later
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
                //store res in cache
                await fileCache.setItem(args.path, result);

                return result;
            });
        }
    }
}