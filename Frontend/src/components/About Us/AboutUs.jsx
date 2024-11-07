function AboutUs() {
    return (
        <>
            <main className="p-5 space-y-5">
                <h1 className="font-semibold text-3xl mb-5">About Us</h1>
 
                <section id="introduction">
                    <h2 className="text-2xl mb-3">Welcome to HireElite!!</h2>
                    <p>HireElite makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.</p>
                </section>
                <section id="mission">
                    <h2>Mission Statement</h2>
                    <p>HireElite provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.</p>
                </section>
                <section id="story">
                    <h2>Our Story</h2>
                    <p>Your story content here. Share the background of your platform and why it was created.</p>
                </section>
                <section id="values">
                    <h2>Core Values</h2>
                    <ul>
                        <li><strong>Integrity:</strong> We are committed to transparency and fairness in every interaction.</li>
                        <li><strong>Innovation:</strong> We continuously strive to improve our platform and services.</li>
                        <li><strong>Community:</strong> We believe in building a supportive community for freelancers and employers alike.</li>
                    </ul>
                </section>
                <section id="team">
                    <h2>Meet the Team</h2>
                    <div className="team-member">
                        <h3>Your Name</h3>
                        <p>Your bio here. Share your background and role in the company.</p>
                    </div>
                    {/* Add more team members as needed */}
                </section>
                <section id="cta">
                    <h2>Join Us Today!</h2>
                    <p>Call to action here. Encourage users to sign up or get involved with your platform.</p>
                </section>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} HireElite. All rights reserved.</p>
            </footer>
        </>
    );
}

export default AboutUs;
