import { AdminLogginData } from '../interfaces/admin.interface';

export class AdminData {
  private adminData: AdminLogginData = {
    data: {
      ID: '',
      user_login: '',
      user_pass: '',
      user_nicename: '',
      user_email: '',
      user_url: '',
      user_registered: '',
      user_activation_key: '',
      user_status: '',
      display_name: ''
  },
  ID: null,
  caps: {
      administrator: false
  },
  cap_key: '',
  roles: [],
  allcaps: {
      switch_themes: false,
      edit_themes: false,
      activate_plugins: false,
      edit_plugins: false,
      edit_users: false,
      edit_files: false,
      manage_options: false,
      moderate_comments: false,
      manage_categories: false,
      manage_links: false,
      upload_files: false,
      import: false,
      unfiltered_html: false,
      edit_posts: false,
      edit_others_posts: false,
      edit_published_posts: false,
      publish_posts: false,
      edit_pages: false,
      read: false,
      level_10: false,
      level_9: false,
      level_8: false,
      level_7: false,
      level_6: false,
      level_5: false,
      level_4: false,
      level_3: false,
      level_2: false,
      level_1: false,
      level_0: false,
      edit_others_pages: false,
      edit_published_pages: false,
      publish_pages: false,
      delete_pages: false,
      delete_others_pages: false,
      delete_published_pages: false,
      delete_posts: false,
      delete_others_posts: false,
      delete_published_posts: false,
      delete_private_posts: false,
      edit_private_posts: false,
      read_private_posts: false,
      delete_private_pages: false,
      edit_private_pages: false,
      read_private_pages: false,
      delete_users: false,
      create_users: false,
      unfiltered_upload: false,
      edit_dashboard: false,
      update_plugins: false,
      delete_plugins: false,
      install_plugins: false,
      update_themes: false,
      install_themes: false,
      update_core: false,
      list_users: false,
      remove_users: false,
      promote_users: false,
      edit_theme_options: false,
      delete_themes: false,
      export: false,
      create_posts: false,
      administrator: false
  },
  filter: null
  };
  setAdminData(adminData: AdminLogginData) {
  this.adminData = adminData;
  }
  getAdminData(): AdminLogginData  {
    return this.adminData;
  }

}
