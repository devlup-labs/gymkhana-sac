from django.contrib import admin
from .models import Society, Board, Committee, Membership, SocialLink, Senate, SenateMembership, Activity, Contact, SacKeyPeople, Faculty


class MembershipInline(admin.StackedInline):
    model = SenateMembership
    can_delete = True
    verbose_name_plural = 'Members'


class CommitteeMembershipInline(admin.StackedInline):
    model = Membership
    can_delete = True
    verbose_name_plural = 'Members'


class FacultyAdmin(admin.ModelAdmin):
    list_display = ('name',)


class SenateAdmin(admin.ModelAdmin):
    inlines = (MembershipInline,)


class SacKeyPeopleAdmin(admin.ModelAdmin):
    list_display = ('name', 'gen_secy', 'gen_secy_sac')


class BoardAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name", "year")}
    list_display = ('name', 'is_active', 'year')
    list_filter = ('year', 'is_active')


class SocietyAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ['name', 'board__name']
    list_display = ('__str__', 'board', 'stype', 'published')
    list_filter = ('published', 'stype')


class CommitteeAdmin(admin.ModelAdmin):
    inlines = (CommitteeMembershipInline,)
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ['name', 'board__name']
    list_display = ('__str__', 'board', 'ctype', 'published')
    list_filter = ('published', 'ctype')


class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'society', 'committee')


# iterable list
main_models = [
    SocialLink,
    Contact
]

admin.site.register(Society, SocietyAdmin)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Board, BoardAdmin)
admin.site.register(Committee, CommitteeAdmin)
admin.site.register(Senate, SenateAdmin)
admin.site.register(SacKeyPeople, SacKeyPeopleAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(main_models)
