<template lang="pug">
  v-flex(v-if="!$apollo.queries._committees.loading")
    v-parallax(
      dark
      :src="committee.cover.sizes.length ? committee.cover.sizes.find(e => e.name === 'full_size').url : require('../assets/home5.jpg') "
      :height="$vuetify.theme.options.parallaxHeight * 1.3"
    ).topbar-style
      v-layout.justify-center.align-center.fill-height
        h1 {{ committee.name }}
    v-container.pa-4
      v-row(:style="{'margin-top': `-${ $vuetify.theme.options.parallaxHeight / 3.5 }px`}").justify-center
        v-col(sm="10" md="8")
          v-card(
            :style="{'border-top': `8px solid ${ $vuetify.theme.themes.light.primary }`}"
          ).pa-5.elevation-8
            v-card-title.display-1.font-weight-light About
            v-card-text
              span(v-html="committee.description")
            v-card-actions(v-if="committee.resourcesLink").justify-end
              | Link to resources
              v-btn.ml-2(right ripple class="accent" :href="committee.resourcesLink" target="_blank")
                v-icon mdi-arrow-right
    v-container
      v-layout(row)
        v-flex.md4
          v-card(flat tile text).background-color
            v-card-title.headline.justify-center
              v-icon(left large) mdi-lightbulb-outline
              | Upcoming Event
            v-card-text(v-if="committee.eventSet.edges.length")
              EventTable(:eventsList="committee.eventSet.edges")
            v-card-text(v-else).text-center.subtitle-1.ml-2 There are currently no events.
        v-flex.md7.offset-md1.elevation-0(flat tile depressed).pl-md-5.xs12
          v-card-title.headline.justify-center
            v-icon(left large) mdi-newspaper-plus
            | Activities and News
          v-tabs(fixed-tabs background-color='primary lighten-1' dark v-model="tab")
            v-tab
              | Activities
            v-tab
              v-icon(left) mdi-newspaper
              | news
          v-tabs-items(v-model="tab" )
            v-tab-item(v-if="committee.activitySet.edges.length" )
              ActivityComponent(:activitiesList="committee.activitySet.edges" )
            v-tab-item(v-else ).pa-8.text-center.title.background-color There are no activities.
            v-tab-item
              v-card(flat tile text ).pa-4.background-color
                v-card-text(v-if="committee.newsSet.edges.length")
                  NewsTable(:newsList="committee.newsSet.edges")
                v-card-text(v-else).pa-4.title.text-center
                  | There is no news currently
    v-container.pa-8
      v-flex.md10.offset-md1(v-if="committee.secretary || committee.jointSecretaryOne || committee.jointSecretaryTwo || committee.jointSecretaryThree")
        v-card(class="accent white--text").elevation-10
          v-card-title.justify-center.display-1 Key People
        v-row.justify-space-around(v-if="committee.ctype == 'T'")
          v-flex(v-if="committee.jointSecretaryOne").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryOne" :designation="'Vice Captain'")
          v-flex(v-if="committee.secretary").md4.xs12
            CaptainComponent(:profile="committee.secretary" :designation="'Captain'")
          v-flex(v-if="committee.jointSecretaryTwo").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryTwo" :designation="'Vice Captain'")
          v-flex(v-if="committee.jointSecretaryThree").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryThree" :designation="'Vice Captain'")
        v-row.justify-space-around(v-else)
          v-flex(v-if="committee.jointSecretaryOne").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryOne" :designation="'Joint Secretary'")
          v-flex(v-if="committee.secretary").md4.xs12
            CaptainComponent(:profile="committee.secretary" :designation="'Secretary'")
          v-flex(v-if="committee.jointSecretaryTwo").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryTwo" :designation="'Joint Secretary'")
          v-flex(v-if="committee.jointSecretaryThree").md4.xs12
            CaptainComponent(:profile="committee.jointSecretaryThree" :designation="'Joint Secretary'") 
    v-container.pa-5(v-if="committee.customHtml")
      span(v-html="committee.customHtml")
    v-container.pa-8(v-if="committee.members.edges.length" fluid)
      v-flex.md8.offset-md2
        v-card(class="accent white--text").elevation-10
          v-card-title.justify-center.display-1 Key People
      v-row.justify-space-around
        v-col(cols="12" md="6" lg="4" v-for="({ node }, j) in committee.members.edges" :key="j")
            CaptainComponent(:profile="node")
</template>

<script>
import EventTable from "../components/common/tables/EventTable";
import NewsTable from "../components/common/tables/NewsTable";
import Footer from "../components/common/Footer";
import { GET_COMMITTEE_DATA_QUERY } from "../graphql/queries/committeeDataQuery";
import ActivityComponent from "../components/common/ActivityComponent";
import CaptainComponent from "../components/common/cards/CaptainComponent";
import CoreMemberComponent from "../components/common/cards/CoreMemberComponent";

export default {
  apollo: {
    _committees: {
      query: GET_COMMITTEE_DATA_QUERY,
      variables() {
        return {
          slugText: this.$route.params.slug
        };
      },
      update: data => data.committees
    }
  },
  name: "Committee",
  components: {
    CoreMemberComponent,
    CaptainComponent,
    ActivityComponent,
    Footer,
    NewsTable,
    EventTable
  },
  data: () => ({
    tab: null
  }),
  computed: {
    committee() {
      return this._committees.edges[0].node;
    }
  }
};
</script>

<style scoped>
.topbar-style {
  margin-top: -48px;
}

.background-color {
  background-color: #fafafa;
}
</style>
