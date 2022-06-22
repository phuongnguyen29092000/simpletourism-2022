package com.example.simpletouristapp.ui.news;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.NewsAdapter;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.model.NewsResponse;
import com.example.simpletouristapp.repository.NewsRepository;
import com.example.simpletouristapp.service.NewsApiService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class NewsFragment extends Fragment {

    private NewsFragmentBinding binding;
    private NewsViewModel newsViewModel;
    private NewsApiService newsApiService;
    private NewsAdapter newsAdapter;
    private RecyclerView rvNews;
    private NewsRepository newsRepository;
    private List<News> newsList;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        newsViewModel =
                new ViewModelProvider(this).get(NewsViewModel.class);

        binding = NewsFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        rvNews = binding.rvNews;
        newsList = new ArrayList<>();
        newsRepository = new NewsRepository(getActivity().getApplication());
        newsAdapter = new NewsAdapter(getContext(), newsList, "news");
        rvNews.setLayoutManager(new GridLayoutManager(getContext(), 2));
        newsViewModel.getAllNews().observe(getViewLifecycleOwner(), new Observer<List<News>>() {
            @Override
            public void onChanged(List<News> newsList) {
                newsAdapter.getAllNews(newsList);
                rvNews.setAdapter(newsAdapter);
            }
        });
        getAllNews();
        return root;
    }

    private void getAllNews() {
        newsApiService = new NewsApiService();
        Call<NewsResponse> call = newsApiService.getAllNews();
        call.enqueue(new Callback<NewsResponse>() {
            @Override
            public void onResponse(Call<NewsResponse> call, Response<NewsResponse> response) {
                if (response.code() == 200) {
                    NewsResponse newsResponse = response.body();
                    newsRepository.deleteAll();
                    for (News news : newsResponse.getNews()
                    ) {
                        news.setCompanyName(news.getOwner().getCompanyName());
                        newsList.add(news);
                    }
                    newsRepository.insert(newsList);
                }
            }

            @Override
            public void onFailure(Call<NewsResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG", t.getMessage());
            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}