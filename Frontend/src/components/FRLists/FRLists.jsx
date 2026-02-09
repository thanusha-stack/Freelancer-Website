import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import FreelancerCard from '../FLsection/FLsection';
import SubHeader from '../../pages/Client/SubHeader/SubHeader';

const FreelancerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const { data: freelancersList, loading } = useFetch('/api/users?role=freelancer');
  const freelancers = freelancersList || []; // fallback to empty array

  // Deprecated manual fetch
  /* 
  useEffect(() => {
    ... 
  }, []);
  */

  // Filter and map freelancers based on search query and selected filter
  const filteredFreelancers = freelancers
    .filter(freelancer =>
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filter || (freelancer.skills && freelancer.skills.includes(filter)))
    )
    .map(user => ({
      name: user.name,
      role: user.bio || "Freelancer",
      hourlyRate: user.hourlyRate || 0,
      jobSuccess: 95, // Placeholder
      tags: user.skills || [],
      image: user.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&size=200&background=random',
    }));

  return (
    <div>
      <SubHeader />
      <section className="mx-10 mt-10">
        <div className="text-3xl py-5">Find Your Perfect Freelancer</div>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or skill..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFreelancers.map((freelancer, index) => (
            <FreelancerCard key={index} {...freelancer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FreelancerPage;
