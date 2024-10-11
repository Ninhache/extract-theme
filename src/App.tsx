import "./App.css";

// const matches = await getMatches();
// console.log(matches);
// if (matches.subcommand?.name === "image") {
//   // `./your-app run $ARGS` was executed
//   const args = matches.subcommand.matches.args;
//   if (args.debug?.value === true) {
//     // `./your-app run --debug` was executed
//   }
//   if (args.release?.value === true) {
//     // `./your-app run --release` was executed
//   }
// }

function App() {
  // const [bla, setBla] = useState<string>();
  // console.log("hello world 1");
  // getMatches().then((matches) => {
  //   console.log("hello world 2", matches);
  //   // {args: {image: {value: null, occurrences: 0}}, subcommand: null}
  //   const args = matches.args;
  //   // @ts-ignore
  //   console.log("matches.args.name === hello", args.image.value);
  //   // @ts-ignore
  //   setBla(`${args.image.value ?? "pas de valeur"}`);
  // });

  return (
    <div className="container">
      <h1 className="text-red-500">Open an image !</h1>
    </div>
  );
}

export default App;
