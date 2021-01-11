namespace :notification do
    desc '利用者にメールを送付する'

    task send_email_from_admin: :environment do
        puts 'Rake Task'
    end
end