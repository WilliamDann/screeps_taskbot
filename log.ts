export default function(data: any)
{
    if (typeof data == 'object')
        console.log(JSON.stringify(data));
    else
        console.log(data);
}