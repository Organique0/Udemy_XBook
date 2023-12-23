import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache',
});

//don't ask me if I know how do all of this regular expressions work
export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: input,
                };
            });
            //unLoad for cache
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                //check if we have the file in cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                }
            });

            //onLoad for css
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                //unpkg auto redirect to correct folder. We can get the redirected url to figure out the correct folder to look into
                const { data, request } = await axios.get(args.path);

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents = `
                const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    //saves the correct url to be used later
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
                //store res in cache
                await fileCache.setItem(args.path, result);

                return result;
            })
            //onLoad for rest
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                //unpkg auto redirect to correct folder. We can get the redirected url to figure out the correct folder to look into
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
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