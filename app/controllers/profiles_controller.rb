class ProfilesController < ApplicationController
    def show
        @profile = current_user.profile
    end

    def edit
        #プロフィールがあれば表示、なければ作成
        @profile = current_user.prepare_profile
    end

    def update
        @profile = current_user.prepare_profile
        @profile.assign_attributes(profile_params)
        if @profile.save
            redirect_to profile_path, notice: 'プロフィールを更新しました'
        else
            flash.now[:error] = '更新に失敗しました'
            render:new
        end
    end

    private
    def profile_params
        params.require(:profile).permit(
            :nickname,
            :introduction,
            :gender,
            :birthday,
            :subscribed,
            :avatar
        )
    end
end