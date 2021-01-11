namespace :notification do
    desc '利用者にメールを送付する'

    task send_email_from_admin: :environment do
        NotificationFromAdminJob.perform_later('reke task test')
    end
end