import EditableString from "ui/components/general/EditableString";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a
              href="/main"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Profile Page
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <EditableString />
      <div class="flex flex-col items-center">
        <div class="mt-14">
          <img
            class="h-32 w-32 object-cover rounded-full border-2 shadow-md"
            src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            alt="Profile Picture"
          />
        </div>
        <div class="mt-2">
          <h2 class="text-lg font-medium text-gray-900 text-center">
            John Doe
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        <div class="space-y-4">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Age
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              21
            </p>
          </a>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Gender
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              Male
            </p>
          </a>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Bio
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              I love sushi
            </p>
          </a>
        </div>
        <div class="space-y-4">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Education
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              University of Zurich
            </p>
          </a>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Experience
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              2 years of Web development
            </p>
          </a>
        </div>
        <div class="space-y-4">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              I am looking for
            </h5>
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              an apartment with
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}