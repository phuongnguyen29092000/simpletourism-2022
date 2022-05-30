package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.denzcoskun.imageslider.ImageSlider;
import com.denzcoskun.imageslider.constants.ScaleTypes;
import com.denzcoskun.imageslider.models.SlideModel;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.FeedBackAdapter;
import com.example.simpletouristapp.databinding.DetailTourBinding;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailTourFragment extends Fragment {
    private String tourId;
    private DetailTourBinding binding;
    private ToursApiService toursApiService;
    private ImageSlider imageSliderDetail;
    private TextView nameTour;
    private TextView tvPrice;
    private TextView tvTime;
    private TextView tvHotel;
    private TextView tvAmount;
    private TextView tvAmountRemain;
    private TextView tvDescription;
    private TextView tvSchedule;
    private List<SlideModel> slideModelList;
    private RatingBar rating;
    private Button btnBookTour;
    private Button seeMore;
    private Button hide;
    private Button seeMoreDescription;
    private Button hideDescription;
    private FeedBackAdapter feedBackAdapter;
    private RecyclerView rvFeedback;
    private Fragment detailFragment;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            tourId = (String) getArguments().getSerializable("IdTour");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.detail_tour, container, false);
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        imageSliderDetail = (ImageSlider) view.findViewById(R.id.image_slide_detail);

        nameTour = (TextView) view.findViewById(R.id.name_tour);
        tvPrice = (TextView) view.findViewById(R.id.tv_detail_price);
        tvTime = (TextView) view.findViewById(R.id.tv_time_detail);
        tvHotel = (TextView) view.findViewById(R.id.tv_hotel_detail);
        tvAmount = (TextView) view.findViewById(R.id.tv_amount_detail);
        tvAmountRemain = (TextView) view.findViewById(R.id.tv_amount_remain_detail);

        tvDescription = (TextView) view.findViewById(R.id.description);
        tvSchedule = (TextView) view.findViewById(R.id.schedule);
        rvFeedback = (RecyclerView) view.findViewById(R.id.rv_feedback);

        rating = (RatingBar) view.findViewById(R.id.rating_tour);
        btnBookTour = (Button) view.findViewById(R.id.btn_book_tour);
        seeMore = (Button) view.findViewById(R.id.see_more);
        hide = (Button) view.findViewById(R.id.hide);

        seeMoreDescription = (Button) view.findViewById(R.id.see_more_description);
        hideDescription = (Button) view.findViewById(R.id.hide_description);

        slideModelList = new ArrayList<>();

        toursApiService = new ToursApiService();


        Call<FeedBackResponse> call2 = toursApiService.getFeedBackById(tourId);
        call2.enqueue(new Callback<FeedBackResponse>() {
            @Override
            public void onResponse(Call<FeedBackResponse> call, Response<FeedBackResponse> response) {
                if(response.code() == 200){
                    FeedBackResponse feedBackResponse = response.body();
                    feedBackAdapter = new FeedBackAdapter(getContext(),feedBackResponse.getData());
                    rvFeedback.setLayoutManager(new LinearLayoutManager(getContext()));
                    rvFeedback.setAdapter(feedBackAdapter);
                }
            }

            @Override
            public void onFailure(Call<FeedBackResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("feedbackerror",t.getMessage());
            }
        });

        Call<TourResponse> call = toursApiService.getTourByIdAPi(tourId);
        call.enqueue(new Callback<TourResponse>() {
            @Override
            public void onResponse(Call<TourResponse> call, Response<TourResponse> response) {
                if(response.code() == 200){
                    TourResponse tourResponse = response.body();
                    Tour tour = tourResponse.data;

                    Locale lc = new Locale("nv","VN");
                    NumberFormat nf = NumberFormat.getCurrencyInstance(lc);
                    String pattern = "dd/MM/yyyy";
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

//                    Toolbar toolbar = view.findViewById(R.id.toolbar);
//                    toolbar.setTag("abc");
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle(tour.getNameTour());
                    slideModelList.add(new SlideModel("http://192.168.1.2:4000/" + tour.getImageAvatar().substring(7),null));
                    for (String slide: tour.getImageSlide()
                         ) {
                        slideModelList.add(new SlideModel("http://192.168.1.2:4000/" + slide.substring(7),null));
                    }
                    nameTour.setText(tour.getNameTour());
                    rating.setRating(tour.getRating());
                    imageSliderDetail.setImageList(slideModelList, ScaleTypes.CENTER_CROP);

                    tvPrice.setText(nf.format(tour.getPrice()));
                    tvTime.setText(simpleDateFormat.format(tour.getTimeStart()) + " - " + simpleDateFormat.format(tour.getTimeEnd()));
                    tvHotel.setText(tour.getNameHotel());
                    tvAmount.setText(Integer.toString(tour.getAmount()));
                    tvAmountRemain.setText(Integer.toString(tour.getRemainingAmount()));

                    tvDescription.setText(tour.getDescription());
                    tvSchedule.setText(tour.getSchedule());

                }else {
                    Toast.makeText(getContext(), "Wrong Id Tour", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<TourResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });





        Log.d("tourId",tourId);

        btnBookTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("tourName", nameTour.getText().toString());
                bundle.putSerializable("idTour", tourId);
                bundle.putSerializable("price", tvPrice.getText().toString());
                Navigation.findNavController(view).navigate(R.id.action_nav_detail_tour_to_nav_book_tour,bundle);
            }
        });

        seeMoreDescription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tvDescription.setMaxLines(20);
                seeMoreDescription.setVisibility(View.GONE);
                hideDescription.setVisibility(View.VISIBLE);
            }
        });
        hideDescription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tvDescription.setMaxLines(2);
                hideDescription.setVisibility(View.GONE);
                seeMoreDescription.setVisibility(View.VISIBLE);
            }
        });

        seeMore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tvSchedule.setMaxLines(20);
                seeMore.setVisibility(View.GONE);
                hide.setVisibility(View.VISIBLE);
            }
        });
        hide.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tvSchedule.setMaxLines(2);
                hide.setVisibility(View.GONE);
                seeMore.setVisibility(View.VISIBLE);
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
