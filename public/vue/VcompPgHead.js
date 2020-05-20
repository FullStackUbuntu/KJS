


// ~~~~~~~~~~~~~~~~[ -V-COMPONENT-]~~~~~~~~~~~~~~~~
Vue.component('pagehead', {
    template: `<h2>Vcomp Load Test: 'PASSED!'</h2>`,

    props: {
        title: {
            type: Object,
            required: true,
        },
    }


})


// ~~~~~~~~~~~~~~~~[ -NEW-VUE-]~~~~~~~~~~~~~~~~
new Vue({
    el: '#pagehead',

    data(){
        return {
            test: 'testing 123!'
        };
    },

});