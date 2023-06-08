// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1920px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some CIty",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1920px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some CIty",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const[loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   //send a httpe request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, []);
  // we don't need state update because we receive our data via props by getStaticProps

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="List of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {

//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   };

// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://bsargsyan:As13uopQ@cluster0.bquuhml.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
