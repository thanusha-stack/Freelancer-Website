import { useState, useEffect } from 'react';
import JobsCard from './JobsCard.jsx/JobsCard';
import FLSubHeader from '../../pages/Freelancer/Subheader/Subheader';

const JobsListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  // Fetch job data from JSON file
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/Jobs.json'); // Replace with your actual JSON file path
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on search query and selected filter
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!filter || job.tags.includes(filter))
  );

  return (
    <div>
        <FLSubHeader />
    <section className="mx-10">
      <div className="text-3xl py-5">Explore Available Jobs</div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title or skill..."
          className="border px-4 py-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Skills</option>
          <option value="JavaScript">JavaScript</option>
          <option value="GIS">GIS</option>
          <option value="React">React</option>
          <option value="SEO">SEO</option>
          <option value="Python">Python</option>
        </select>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job, index) => (
          <JobsCard key={index} {...job} />
        ))}
      </div>
    </section>
    </div>
  );
};

export default JobsListPage;
