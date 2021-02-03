<template>
    <nav class="nav-extended">
        <div class="nav-content">
            <ul class="tabs tabs-transparent">
                <li class="tab">
                    <router-link to="/">typing</router-link>
                </li>
                <li class="tab">
                    <router-link to="/about">about</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
nav {
    background-color: rgb(41, 41, 41);
}
li {
    margin: auto;
    width: 50%;
}
.router-link-exact-active {
    background-color: rgba(194, 194, 194, 0.1) !important;
}
</style>