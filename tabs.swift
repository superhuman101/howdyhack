import SwiftUI

struct ContentView: View {

    @State var selectedTab = 0

    var body: some View {

        TabView(selection: $selectedTab) {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
                .tabitem {
                    Image(systemName: "plus") //Map Icon (with a magnifiying glass???)
                }
                .tag(0)

            Text("This will be where the user can take a picture.")
                .tabItem {
                    Image(systemName: "pencil") //Camera
                }
                .tag(1)

            Text("This will be a slide show or collage of all of the revelle sightings of the day.")
                .tabItem {
                    Image(systemName: "pencil") //Multiple picutres together
                }
        }
        .padding()
    
    }
}

