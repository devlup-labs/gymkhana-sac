<template lang="pug">
  v-flex(v-if="!$apollo.queries._societies.loading")
    v-parallax(
      dark
      :src="society.cover.sizes.length ? society.cover.sizes.find(e => e.name === 'full_size').url : require('../assets/home5.jpg') "
      :height="$vuetify.theme.options.parallaxHeight * 1.3"
    ).topbar-style
      v-layout.justify-center.align-center.fill-height
        h1 {{ society.name }}
    v-container.pa-4
      v-row(:style="{'margin-top': `-${ $vuetify.theme.options.parallaxHeight / 3.5 }px`}").justify-center
        v-col(sm="10" md="8")
          v-card(
            :style="{'border-top': `8px solid ${ $vuetify.theme.themes.light.primary }`}"
          ).pa-5.elevation-8
            v-card-title.display-1.font-weight-light About
            v-card-text
              span(v-html="society.description")
            v-card-actions(v-if="society.resourcesLink").justify-end
              | Link to resources
              v-btn.ml-2(right ripple class="accent" :href="society.resourcesLink" target="_blank")
                v-icon mdi-arrow-right
    v-container
      v-layout(row)
        v-flex.md4
          v-card(flat tile text).background-color
            v-card-title.headline.justify-center
              v-icon(left large) mdi-lightbulb-outline
              | Upcoming Event
            v-card-text(v-if="society.eventSet.edges.length")
              EventTable(:eventsList="society.eventSet.edges")
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
            v-tab-item(v-if="society.activitySet.edges.length" )
              ActivityComponent(:activitiesList="society.activitySet.edges" )
            v-tab-item(v-else ).pa-8.text-center.title.background-color There are no activities.
            v-tab-item
              v-card(flat tile text ).pa-4.background-color
                v-card-text(v-if="society.newsSet.edges.length")
                  NewsTable(:newsList="society.newsSet.edges")
                v-card-text(v-else).pa-4.title.text-center
                  | There is no news currently
    v-container.pa-8
      v-flex.md10.offset-md1(v-if="society.secretary || society.jointSecretaryOne || society.jointSecretaryTwo || society.jointSecretaryThree")
        v-card(class="accent white--text").elevation-10
          v-card-title.justify-center.display-1 Key People
        v-row.justify-space-around(v-if="society.stype == 'T'")
          v-flex(v-if="society.jointSecretaryOne").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryOne" :designation="'Vice Captain'")
          v-flex(v-if="society.secretary").md4.xs12
            CaptainComponent(:profile="society.secretary" :designation="'Captain'")
          v-flex(v-if="society.jointSecretaryTwo").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryTwo" :designation="'Vice Captain'")
          v-flex(v-if="society.jointSecretaryThree").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryThree" :designation="'Vice Captain'")
        v-row.justify-space-around(v-else)
          v-flex(v-if="society.jointSecretaryOne").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryOne" :designation="'Joint Secretary'")
          v-flex(v-if="society.secretary").md4.xs12
            CaptainComponent(:profile="society.secretary" :designation="'Secretary'")
          v-flex(v-if="society.jointSecretaryTwo").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryTwo" :designation="'Joint Secretary'")
          v-flex(v-if="society.jointSecretaryThree").md4.xs12
            CaptainComponent(:profile="society.jointSecretaryThree" :designation="'Joint Secretary'")
    v-container.pa-5(v-if="society.customHtml")
      span(v-html="society.customHtml")
</template>

<script>
import EventTable from "../components/common/tables/EventTable";
import NewsTable from "../components/common/tables/NewsTable";
import Footer from "../components/common/Footer";
import { GET_SOCIETY_DATA_QUERY } from "../graphql/queries/societyDataQuery";
import ActivityComponent from "../components/common/ActivityComponent";
import CaptainComponent from "../components/common/cards/CaptainComponent";

export default {
  apollo: {
    _societies: {
      query: GET_SOCIETY_DATA_QUERY,
      variables() {
        return {
          slugText: this.$route.params.slug
        };
      },
      update: data => data.societies
    }
  },
  name: "Society",
  components: {
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
    society() {
      return this._societies.edges[0].node;
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
