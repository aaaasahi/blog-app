class RemoveContentFromArticles < ActiveRecord::Migration[6.0]
  #migrate時に実行
  def up
    remove_column :articles, :content
  end

  #rollback時に実行
  def down
    add_column :articles, :content, :text
  end
end
