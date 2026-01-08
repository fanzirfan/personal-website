import { defineConfig } from 'jsrepo';

export default defineConfig({
    // configure where stuff comes from here
    registries: ["https://reactbits.dev/r"],
    // configure were stuff goes here
    paths: {
        components: 'src/components',
        ui: 'src/components/ui',
        lib: 'src/lib',
        hooks: 'src/hooks',
		component: './src/component'
    },
});