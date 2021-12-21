import factory
from fixture.userfixture import UserProfileFactory

class SackeypeopleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'main.SacKeyPeople'

    gen_secy = factory.SubFactory(UserProfileFactory)
    gen_secy_sac = factory.SubFactory(UserProfileFactory)
