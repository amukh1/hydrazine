use discord_rich_presence::{
    activity::{self, Assets, Button},
    DiscordIpc, DiscordIpcClient,
};

pub fn set_presence() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = DiscordIpcClient::new("1002568032041832578")?;

    client.connect()?;
    client.set_activity(
        activity::Activity::new()
            .details("Creating a Discord bot.")
            .assets(Assets::large_image(Assets::new(), "1024x1024"))
            .assets(Assets::small_image(Assets::new(), "512x512"))
            .buttons(vec![Button::new(
                "Learn more",
                "https://github.com/jareer12/hydrazine",
            )]),
    )?;

    loop {}
}
