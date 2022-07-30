#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod presence;

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("Unknown Error Occurred While Running Application!");
    let discord = presence::set_presence();
    println!("{:?}", discord);
}
