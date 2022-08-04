use discord_presence::Client as DiscordRPC;

pub fn set_presence() {
    let mut drpc = DiscordRPC::new(1002568032041832578);

    drpc.on_ready(|_ctx| {
        println!("READY!");
    });

    drpc.on_error(|ctx| {
        eprintln!("An error occured, {}", ctx.event);
    });

    drpc.start();

    if let Err(why) = drpc.set_activity(|a| {
        a.state("Running examples").assets(|ass| {
            ass.small_image("512x512")
                .large_image("1024x1024")
                .large_text("Building a Discord Bot")
                .small_text("With Hydrazine")
        })
    }) {
        println!("Failed to set presence: {}", why);
    }
}
