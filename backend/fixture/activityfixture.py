import factory
from fixture.societyfixture import SocietyFactory
from fixture.committeefixture import CommitteeFactory


class ActivityFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'main.Activity'

    name = factory.Faker('sentence', nb_words=2)
    society = factory.SubFactory(SocietyFactory)
    committee = factory.SubFactory(CommitteeFactory)
    description = factory.Faker('sentence', nb_words=30)
    custom_html = factory.Faker('sentence', nb_words=20)
