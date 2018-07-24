export const getJobDescription = job => {
    return `A job working for ${job.company.name}. It pays ${job.pay ? `£${job.pay}` : 'nothing'}. ${job.deadline ? `Applications close in ${job.deadline} days` : 'Applications will remain open until a suitable candidate is found'}. This job uses ${Object.keys(job.competencies).join(', ')}. It should take about ${job.hoursToComplete} hours.`;
}