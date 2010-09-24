var FolderAssistant = Class.create(BaseAssistant, {
  initialize: function($super, folders) {
    $super()
    this.folders = folders
  },
  
  setup: function($super) {
    $super()
    this.controller.setupWidget("folders", {itemTemplate: "folder/folder", onItemRendered: this.itemRendered}, this.folders)
    this.controller.listen("folders", Mojo.Event.listTap, this.folderTaped = this.folderTapped.bind(this))
  },
  
  cleanup: function($super) {
    $super()
    this.controller.stopListening("folders", Mojo.Event.listTap, this.folderTaped)
  },  

  ready: function($super) {
    this.controller.get("header").update(this.folders.title)
  },
  
  itemRendered: function(listWidget, itemModel, itemNode) {
    if(itemModel.unreadCount) {
      $(itemNode).addClassName("unread")
    }
  },
  
  folderTapped: function(event) {
    this.controller.stageController.pushScene("articles", event.item)
  }
})