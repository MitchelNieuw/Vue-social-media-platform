<template>
    <div class="col-md-3">
<!--        <img class="img-profile mr-3"-->
<!--             src="{{ 'profilePictures/' . auth()->user()->profilePicture }}" alt="profile picture">-->
<!--        <div class="d-inline-block align-middle">-->
<!--            <p class="h4 mb-0">{{ auth()->user()->name }}</p>-->
<!--            <p class="h5 font-weight-normal text-primary mb-0">{{ '@'.auth()->user()->tag }}</p>-->
<!--        </div>-->
<!--        <div class="mt-3">-->
<!--            <a href="/user/{{ auth()->user()->tag }}/following"-->
<!--               class="d-inline-block m-0 mr-3">Following {{ $followingCount }}</a>-->
<!--            <a href="/user/{{ auth()->user()->tag }}/followers"-->
<!--               class="d-inline-block m-0">Followers {{ $followersCount }}</a>-->
<!--            <p class="">Since {{ auth()->user()->created_at->format('Y M d') }}</p>-->
<!--        </div>-->
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class UserInfo extends Vue {

    }
</script>
