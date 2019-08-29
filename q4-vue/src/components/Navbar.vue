<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="links[0].url" v-text="title">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <template v-for="(link, i) of links">
                <b-nav-item :key="i" :to="link.url" :active="link.active" @click="linkClicked(link)">{{link.title}}
                </b-nav-item>
            </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: "Navbar",
    data: () => ({
        title: 'Reedsy Books',
        links: [
            { title: 'Books', url: '/books', active: true }
        ]
    }),
    methods: {
        linkClicked(link) {
            this.links = this.links.map(d => {
                if (d.url === link.url) {
                    d.active = true;
                } else {
                    d.active = false;
                }
                return d;
            });
        }
    }
};
</script>
