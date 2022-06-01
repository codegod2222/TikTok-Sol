
/// Include libraries for program
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use solana_program::entrypoint::ProgramResult;
use std::mem::size_of;
use anchor_lang::solana_program::log::{
    sol_log_compute_units
};
// Declare program ID
declare_id!("62C9diNeSgC75F6hvXFbCWG5BuTa1XPEMLkMnoJNkd9F");

// Video and comment text length
const TEXT_LENGTH: usize = 1024;
// Username length
const USER_NAME_LENGTH: usize = 100;
// User profile image url length
const USER_URL_LENGTH: usize = 255;
const VIDEO_URL_LENGTH: usize = 255;

const NUMBER_OF_ALLOWED_LIKES_SPACE: usize = 5;
const NUMBER_OF_ALLOWED_LIKES: u8 = 5;
/// TikTok Clone program
#[program]
pub mod tiktok_clone {
    use super::*;

    /// Create state to save the video counts
    /// There is only one state in the program
    /// This account should be initialized before video
    pub fn create_state(
        ctx: Context<CreateState>,
    ) -> ProgramResult {
        // Get state from context
        let state = &mut ctx.accounts.state;
        // Save authority to state
        state.authority = ctx.accounts.authority.key();
        // Set video count as 0 when initializing
        state.video_count = 0;
        Ok(())
    }

    /// Create user
    /// @param name:        user name
    /// @param profile_url: user profile url
    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        profile_url: String
    ) -> ProgramResult {
        // Get State

        // Get video
        let user = &mut ctx.accounts.user;
        // Set authority
        user.user_wallet_address = ctx.accounts.authority.key();
        // Set text
        user.user_name = name;
        user.user_profile_image_url = profile_url;

        msg!("User Added!");  //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }

    /// Create video
    /// @param text:        text of video
    /// @param creator_name: name of video creator
    /// @param creator_url:  url of video creator avatar
    pub fn create_video(
        ctx: Context<CreateVideo>,
        description: String,
        video_url: String,
        creator_name: String,
        creator_url: String,
    ) -> ProgramResult {
        // Get State
       msg!(&description);  //logging

        let state = &mut ctx.accounts.state;

        // Get video
        let video = &mut ctx.accounts.video;
        // Set authority
        video.authority = ctx.accounts.authority.key();
        // Set text
        video.description = description;
        video.video_url = video_url;

        // Set creator name
        video.creator_name = creator_name;
        // Set creator avatar url
        video.creator_url = creator_url;
        // Set comment count as 0
        video.comment_count = 0;
        // Set video index as state's video count
        video.index = state.video_count;
        // Set video time
        video.creator_time = ctx.accounts.clock.unix_timestamp;

        video.likes = 0;

        video.remove = 0;

        // Increase state's video count by 1
        state.video_count += 1;
        msg!("Video Added!");  //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }

    pub fn create_comment(
        ctx: Context<CreateComment>,
        text: String,
        commenter_name: String,
        commenter_url: String
    ) -> ProgramResult {
        let video: &mut Account<VideoAccount> = &mut ctx.accounts.video;
        let comment: &mut Account<CommentAccount> = &mut ctx.accounts.comment;

        comment.authority = ctx.accounts.authority.key();

        comment.text = text;

        comment.commenter_name = commenter_name;

        comment.commenter_url = commenter_url;

        comment.index = video.comment_count;

        comment.video_time = ctx.accounts.clock.unix_timestamp;

        video.comment_count += 1;

        Ok(())
    }

    pub fn like_video(ctx: Context<LikeVideo>) -> ProgramResult {
        let video: &mut Account<VideoAccount> = &mut ctx.accounts.video;

        // Iterating accounts is safe than indexing
        let mut iter = video.people_who_liked.iter();

        let user_liking_video = ctx.accounts.authority.key();

        video.likes += 1;

        video.people_who_liked.push(user_liking_video);

        Ok(())
    }
}

/// Contexts
/// CreateState context
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticating state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8
    )]
    pub state: Account<'info, StateAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for tiktok
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

/// CreateUser context
#[derive(Accounts)]
pub struct CreateUser<'info> {
    // Authenticate user account
    #[account(
        init,
        // User account use string "user" and index of user as seeds
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_NAME_LENGTH + VIDEO_URL_LENGTH + 8
    )]
    pub user: Account<'info, UserAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for tiktok
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

/// CreateVideo context
#[derive(Accounts)]
pub struct CreateVideo<'info> {
    // Authenticate state account
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>,

    // Authenticate video account
    #[account(
        init,
        // Video account use string "video" and index of video as seeds
        seeds = [b"video".as_ref(), state.video_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<VideoAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH+VIDEO_URL_LENGTH+8+32*NUMBER_OF_ALLOWED_LIKES_SPACE // 32 bits in a pubkey and we have 5
    )]
    pub video: Account<'info, VideoAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for tiktok
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}


#[derive(Accounts)]
pub struct LikeVideo<'info> {
    #[account(mut)]
    pub video: Account<'info, VideoAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for tiktok
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}


// State Account Structure
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,

    // Video count
    pub video_count: u64,
}

// State Account Structure
#[account]
pub struct UserAccount {
    // user name
    pub user_name: String,

    // user wallet address
    pub user_wallet_address: Pubkey,

    // user profile image url
    pub user_profile_image_url: String,
}

// Video Account Structure
#[account]
pub struct VideoAccount {
    // Signer address
    pub authority: Pubkey,

    // description text
    pub description: String,

    // video url
    pub video_url: String,

    // Video creator name
    pub creator_name: String,

    // Video creator url
    pub creator_url: String,

    // Comment counts of videos
    pub comment_count: u64,

    // Video index
    pub index: u64,

    // Video time
    pub creator_time: i64,

    // likes: vector of people who liked it,
    pub people_who_liked: Vec<Pubkey>,

    // number of likes
    pub likes: u8,

    pub remove: i64,
}

#[derive(Accounts)]
pub struct CreateComment<'info> {
    #[account(mut)]
    pub video: Account<'info, VideoAccount>,

    #[account(
        init,
        seeds = [b"comment".as_ref(),video.key().as_ref(), video.comment_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<CommentAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH + VIDEO_URL_LENGTH
    )]
    pub comment: Account<'info, CommentAccount>,

    // Authority(This is signer who paid transaction fee)

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>
}

#[account]
pub struct CommentAccount {
    pub authority: Pubkey,

    pub text: String,

    pub commenter_name: String,

    pub commenter_url: String,

    pub index: u64,

    pub video_time: i64,
}
