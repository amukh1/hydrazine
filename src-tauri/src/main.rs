#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod presence;

fn main() {
    let discord = presence::set_presence();
    println!("{:?}", discord);
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("Unknown Error Occurred While Running Application!");
}
